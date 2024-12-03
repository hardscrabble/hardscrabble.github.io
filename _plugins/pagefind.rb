Jekyll::Hooks.register :site, :post_write do |_site|
  system("npx -y pagefind@1.2.0 --site _site", exception: true)
end
