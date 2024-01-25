---
title: Create Rails app sqlite and Minitest one file
date: "2023-12-15T08:06:41.247Z"
tags:
    - rails
    - ruby
---

How to run: `$ ruby complex_arel_ordering_example.rb`

```ruby title="complex_arel_ordering_example.rb"
require 'bundler/inline'

gemfile(true) do
  source 'https://rubygems.org'

  git_source(:github) { |repo| "https://github.com/#{repo}.git" }

  gem 'rails'
  gem 'sqlite3'
end

require 'active_record'
require 'minitest/autorun'
require 'logger'

# This connection will do for database-independent bug reports.
ActiveRecord::Base.establish_connection(adapter: 'sqlite3', database: ':memory:')
ActiveRecord::Base.logger = Logger.new($stdout)

ActiveRecord::Schema.define do
  create_table :posts, force: true do |t|
  end

  create_table :comments, force: true do |t|
    t.integer :post_id
    t.integer :user_id
    t.text :description
  end

  create_table :users, force: true do |t|
    t.string :country
    t.string :name
  end
end

class Post < ActiveRecord::Base
  has_many :comments
end

class User < ActiveRecord::Base
  has_many :comments
end

class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
end

class ComplexOrderingTest < Minitest::Test
  def test_complex_ordering
    # test setup
    post = Post.create!

    user_from_other_country = User.create!(country: 'US')
    user_from_my_country = User.create!(country: 'CA')
    me = User.create!(country: 'CA')

    user_from_other_country.comments.create!(post: post)
    user_from_my_country.comments.create!(post: post)
    me.comments.create!(post: post)

    # order with case
    # can be a scope or a query object
    users = User.arel_table
    same_current_user = users[:id].eq(me.id)
    same_country = users[:country].eq(me.country)

    case_ordering = Arel::Nodes::Case.new
                                     .when(same_current_user).then(1)
                                     .when(same_country).then(2)
                                     .else(3)

    comments_scope = post.comments.joins(:user, :post).order(case_ordering)

    desired_order = [me, user_from_my_country, user_from_other_country]

    assert_equal desired_order.map(&:id), comments_scope.pluck('users.id')
    assert_equal desired_order.map(&:country), comments_scope.pluck('users.country')
  end
end
```
See: https://gist.github.com/thdaraujo/1d9769b3ef204fda9132bf7a3e62b7cc
