import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import fileInclude from "gulp-file-include";
import browserSync from "browser-sync";
import hb from 'gulp-hb';
import fs from "fs";
import path from "path";
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2woff from 'gulp-ttf2woff';

const fontsSrc = 'src/fonts';
const fontsBuild = 'dist/fonts';
const fontsScss = 'src/scss/fonts/fonts.scss';



const sass = gulpSass(dartSass);
const bs = browserSync.create();

const paths = {
  html: {
    src: ["src/*.html", "src/html/**/*.html"],
    dest: "dist",
  },
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js",
  },
  images: {
  src: "src/img/**/*.{jpg,jpeg,png,webp,svg,gif}",
  dest: "dist/img",
},
};


export function html() {
  return gulp
    .src(paths.html.src, { base: "src" })
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      hb()
        .partials("src/html/templates/**/*.hbs")
        .helpers({
          array: (...args) => args.slice(0, -1),
          lookup: (obj, idx) => (obj && obj[idx]) ?? '',
        })
    )
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());
}



export function styles() {
  return gulp
    .src(paths.styles.src, { base: "src/scss" })
    .pipe(sass({
    includePaths: ['src/scss']
    }).on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: "." }))
    .pipe(bs.stream());
}


// export function scripts() {
//   return gulp
//     .src(paths.scripts.src, { base: "src/js" })
//     .pipe(terser())
//     .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: "." }))
//     .pipe(bs.stream());
// }

export function bundleScripts() {
  return gulp
    .src('src/js/utils/app.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist/js'))
    .pipe(bs.stream());
}

export const scripts = bundleScripts;


function copyPngWithNode(cb) {
  const srcDir = path.resolve('src/img');
  const destDir = path.resolve('dist/img');

  fs.mkdirSync(destDir, { recursive: true });

  function copyPngRecursively(currentSrcDir, currentDestDir) {
    const items = fs.readdirSync(currentSrcDir, { withFileTypes: true });
    items.forEach(item => {
      const srcPath = path.join(currentSrcDir, item.name);
      const destPath = path.join(currentDestDir, item.name);

      if (item.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyPngRecursively(srcPath, destPath);
      } else if (item.isFile() && item.name.toLowerCase().endsWith('.png')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied PNG: ${destPath}`);
      }
    });
  }

  copyPngRecursively(srcDir, destDir);

  cb();
}


function imagesOptimize() {
  return gulp.src(['src/img/**/*', '!src/img/**/*.gif', '!src/img/**/*.png'])
    // .pipe(imagemin()) 
    .pipe(gulp.dest(paths.images.dest));
}

const images = gulp.parallel(copyPngWithNode, imagesOptimize);
;


export function serve() {
  bs.init({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images)

}

export const build = gulp.series(gulp.parallel(html, styles, scripts, images));
export default gulp.series(build, serve);




export function otfToTtf() {
  return gulp
    .src(`${fontsSrc}/*.otf`)
    .pipe(fonter({ formats: ['ttf'] }))
    .pipe(gulp.dest(`${fontsSrc}/`));
}

export function ttfToWoff() {
  return gulp
    .src(`${fontsSrc}/*.ttf`)
    .pipe(ttf2woff())  
    .pipe(gulp.dest(fontsBuild)) 
    .pipe(gulp.src(`${fontsSrc}/*.ttf`))
    .pipe(ttf2woff2())  
    .pipe(gulp.dest(fontsBuild)); 
}

export function fontsStyle(cb) {
  fs.readdir(fontsBuild, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsScss)) {
        fs.writeFileSync(fontsScss, '');
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0];
            let fontWeight = fontFileName.split('-')[1] || '400';

            switch (fontWeight.toLowerCase()) {
              case 'thin': fontWeight = 100; break;
              case 'extralight': fontWeight = 200; break;
              case 'light': fontWeight = 300; break;
              case 'medium': fontWeight = 500; break;
              case 'semibold': fontWeight = 600; break;
              case 'bold': fontWeight = 700; break;
              case 'extrabold':
              case 'heavy': fontWeight = 800; break;
              case 'black': fontWeight = 900; break;
              default: fontWeight = 400;
            }

            fs.appendFileSync(
              fontsScss,
              `@font-face {
  font-family: '${fontName}';
  font-display: swap;
  src: url("../fonts/${fontFileName}.woff2") format("woff2"),
       url("../fonts/${fontFileName}.woff") format("woff");
  font-weight: ${fontWeight};
  font-style: normal;
}\n`
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log('❗ fonts.scss уже существует. Удали его, чтобы перегенерировать.');
      }
    }
  });
  cb();
}


export const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
