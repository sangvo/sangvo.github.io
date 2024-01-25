---
title: Union all với Arel ruby on rails
date: "2024-01-25T02:38:29.110Z"
tags:
  - rails
  - arel
draft: false
---
Khi muốn muốn hợp nhất 2 câu query trong SQL thì chúng ta sẽ sử dụng `UNION` và `UNION ALL`, nhưng rails không support built in phương thức này

Thông thường chúng ta sẽ sử dụng những cách sau:
1. Viết Raw SQL
2. Dùng gem `active_record_union`
3.  Sử dụng Arel đã có sẵn trong core của rails

Ví dụ bài toán là lấy ra 20 bài viết theo category A và 10 bài viết category B. sau đó sắp xếp lại theo ngày public bài viết.


```ruby
category_a = Article.published
                    .joins(:category)
                    .where('categories.title = ?', 'A')
                    .limit(20).arel

category_b = Article.published
                    .joins(:category)
                    .where('categories.title = ?', 'B')
                    .limit(10).arel

union_all = Arel::Nodes::As.new(
  Arel::Nodes::UnionAll.new(category_a, category_b),
  Article.arel_table
)

// Result
articles = Article.from(union_all).order(published_at: :desc)
```
