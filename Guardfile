notification :off

guard 'coffeescript', :input => '_coffee', :output => 'js',  :all_on_start => true
guard 'sass'        , :input => '_sass',   :output => 'css', :all_on_start => true, :style => :compressed

guard 'jekyll-plus', :serve => true, :baseurl => '/', :port => '1234', :drafts => true do
  watch /.*/
  ignore /^_site/
end

