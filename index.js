const fs = require('fs');
const http = require('http');
const url = require('url');

/*
// sync
const jsText = fs.readFileSync('./store/javascript.txt', 'utf-8');
console.log(jsText);
fs.writeFileSync('./store/testFile.txt', `data`, 'utf-8');

// async
fs.readFile('./store/javascript.txt', 'utf-8', (err, data) => {
  fs.readFile('./store/resolved.txt', 'utf-8', (err, data2) => {
    console.log(`${data}\n${data2}`);
  });
});
*/

const replaceTemp = (temp, el) => {
  let a = temp.replace('{%MOVIE_TITLE%}', el.title);
  a = a.replace('{%MOVIE_TITLE%}', el.title);
  a = a.replace('{%ID%}', el.id);
  a = a.replace('{%MOVIE_TEXT%}', el.desc);
  return a;
};

const movieData = fs.readFileSync('./store/movie-data.json', 'utf-8');
const parseMovieData = JSON.parse(movieData);

const tempOverview = fs.readFileSync('./templates/overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/product-movie.html', 'utf-8');

const tempCard = fs.readFileSync('./templates/movie-card.html', 'utf-8');
const movieItemHtml = fs.readFileSync('./templates/movie-item.html', 'utf-8');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  // OVERVIEW
  if (pathname === '/' || pathname === 'overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const movieCards = parseMovieData
      .map((el) => replaceTemp(tempCard, el))
      .join('');

    const movieHtml = tempOverview.replace('{%MOVIE_BOX%}', movieCards);
    res.end(movieHtml);

    // MOVIE
  } else if (pathname === '/movie') {
    const movieItem = parseMovieData[query.id];

    const movieHtml = tempProduct.replace(
      '{%movie-title%}',
      replaceTemp(movieItemHtml, movieItem)
    );
    res.end(movieHtml);
  } else {
    res.end('NOT A PAGE');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started');
});
