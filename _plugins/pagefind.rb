Jekyll::Hooks.register :site, :post_write do |_site|
  system("pnpm pagefind --site _site", exception: true)
end
