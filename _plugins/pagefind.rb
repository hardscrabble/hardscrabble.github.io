Jekyll::Hooks.register :site, :post_write do |page|
  system("npx -y pagefind@1.2.0 --site _site", exception: true)
end
