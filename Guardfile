notification :off

guard 'coffeescript', :input => '_coffee', :output => 'js',  :all_on_start => true
guard 'sass',         :input => '_scss',   :output => 'css', :all_on_start => true

guard 'jekyll-plus', :serve => true, :baseurl => '/', :port => '1234' do
  watch /.*/
  ignore /^_site/
end

