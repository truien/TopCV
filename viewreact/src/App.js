import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="display-4">Chào Mừng Đến Với Ứng Dụng Của Chúng Tôi!</h1>
        <p className="lead">
          Chỉnh sửa <code>src/App.js</code> và lưu để tải lại.
        </p>
        <a
          className="btn btn-primary"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Học React
        </a>
      </header>
    </div>
  );
}

export default App;
