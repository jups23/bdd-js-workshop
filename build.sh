for i in $(find . -name "*.coffee"); do coffee --compile $i; echo compiling $i; done

