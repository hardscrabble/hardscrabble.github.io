Jekyll::Hooks.register :site, :post_write do |page|
  system("npx -y pagefind@1.0.4 --site _site", exception: true)
end
