---
title: "Rake task backup database rails"
tags:
- rails
---

```ruby {title="mysql_tool.rake"}
namespace :mysql_tool do
  task backup: :environment do
    backup_dir = Settings.dig(:mysql_tool, :backup_dir)
    raise "Not support environment #{Rails.env}" unless backup_dir

    FileUtils.mkdir_p backup_dir unless File.directory?(backup_dir)

    time_zone_now = Time.zone.now.strftime("%Y%m%d%H%M%S")
    dump_file = "#{backup_dir}/dump_data_#{time_zone_now}.sql"
    password_unzip = Settings.dig(:mysql_tool, :password_unzip)
    dump_file_query(dump_file)
    zip_exports(dump_file,password_unzip)
    remove_outdated_dump_file(backup_dir)
  end

  private

  def dump_file_query(dump_file)
    config = Rails.configuration.database_configuration
    dump_query = "mysqldump"
    config[Rails.env].each do |key, value|
      dump_query << " -u\"#{value}\"" if key == "username"
      dump_query << " -p\"#{value}\"" if key == "password"
      dump_query << " -h#{value}" if key == "host"
      dump_query << " #{value}" if key == "database"
      dump_query << " --ssl-ca=#{value}" if key == "sslca"
    end
    unless system("#{dump_query} > #{dump_file}")
      raise "Can't dump #{dump_query}"
    end
  end

  def zip_exports(dump_file, password)
    password_unzip = Zip::TraditionalEncrypter.new(password)
    buffer = Zip::OutputStream.write_buffer(StringIO.new, password_unzip) do |stream|
      stream.put_next_entry(
        dump_file.split("/").last,
        nil, # comment
        nil, # extra
        Zip::Entry::DEFLATED,
        Zlib::BEST_COMPRESSION,
      )
      stream.write open(dump_file).read
    end
    buffer.rewind
    File.open(dump_file.ext("zip"), "wb") {|f| f.write(buffer.string) }
    File.truncate(dump_file, 0)
    File.delete(dump_file)
  end

  def remove_outdated_dump_file(backup_dir)
    regex_backup_time = /\A.*dump_data_(?<backup_time>\d{14}).(sql|zip)\z/
    week_ago = 1.week.ago
    Dir["#{backup_dir}/dump_data_*.sql", "#{backup_dir}/dump_data_*.zip"].each do |file|
      match_data = file.match(regex_backup_time)
      backup_time = Time.zone.parse(match_data[:backup_time]) rescue nil
      next if backup_time.nil? || backup_time > week_ago

      File.truncate(file, 0)
      File.delete(file)
    end
  end
end
```
