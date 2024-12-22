Jekyll::Hooks.register :site, :post_write do |_site|
  system("pnpm pagefind --site _site --silent", exception: true)
end
