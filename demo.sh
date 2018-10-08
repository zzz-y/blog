if [ -d $1 ]; then
  echo 'error: '$1' 已经存在'
  exit 1
else
  mkdir $1
  cd $1
  mkdir css js
  touch index.html css/style.css js/main.js
  echo '<!DOCTYPE>' >> index.html
  echo '<title>Hello</title>' >> index.html
  echo '<h1>Hi</h1>' >> index.html
  echo 'h1{color: red;}' >> css/style.css
  echo 'var string = "Hello World"' >> js/main.js
  echo 'var string = "alert(string)"' >> js/main.js
  echo 'success'
  exit 0
fi
