# requires `brew install imagemagick`
# generates opengraph preview images for posts that don't already have one

require 'shellwords'

class GeneratePreview
  def initialize(post)
    @post = post
  end

  def write
    if File.exist?("tmp/#{path}")
      puts <<~MSG.chomp
        Already exists - #{path}
      MSG

      return
    end

    font = ENV["OPENGRAPH_FONT"] || "Helvetica"

    cmd = <<~CMD.chomp
      magick \
        -background "#f2d8b2" \
        -font "#{font}" \
        -fill "#248165" \
        -size 1200x630 \
        -gravity SouthWest \
        "caption:#{ Shellwords.shellescape title }" \
        tmp/#{path}
    CMD

    system(cmd) or raise "Failed for #{slug}"

    puts "Generated - tmp/#{path}"
  end

  def path
    "img/preview/#{ date }-#{ slug }.png"
  end

  private

  attr_reader :post

  def date
    post.date.strftime('%Y-%m-%d') 
  end

  def slug
    post.data.fetch("slug")
  end

  def title
    post.data.fetch("title")
  end
end

def assert_exists!(file, preview_image)
  unless File.exist?(preview_image)
    warn <<~MSG
      [Preview image] #{file} references preview image #{preview_image} but that file does not exist
    MSG

    exit 1
  end
end

Jekyll::Hooks.register :posts, :pre_render do |post|
  if preview_image = post.data["preview_image"]
    assert_exists!(post.path, preview_image)
  else
    preview = GeneratePreview.new(post)
    preview.write
    post.merge_data!({"preview_image" => preview.path }, source: "opengraph plugin")
  end
end

Jekyll::Hooks.register :site, :after_init do
  FileUtils.mkdir_p "tmp/img/preview"
end

Jekyll::Hooks.register :site, :post_write do
  FileUtils.mkdir_p("_site/img/preview")

  Dir.glob("tmp/img/preview/*").each do |path|
    FileUtils.cp path, "_site/img/preview"
  end
end
