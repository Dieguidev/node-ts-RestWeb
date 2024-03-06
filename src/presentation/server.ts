import express from 'express';
import path from 'path';



export class Server {

  private app = express();

  private configureJsxMiddleware() {
    // Middleware para servir archivos .jsx como application/javascript
    this.app.use((req, res, next) => {
      if (req.url.endsWith('.jsx')) {
        res.type('application/javascript');
      }
      next();
    });
  }

  async start() {

    //*middlewares
    this.configureJsxMiddleware();
    //* public folder
    this.app.use(express.static('public'));


    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, '../../public/index.html');
      res.sendFile(indexPath);

    })

    this.app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });


  }


}
