import QuadraticSolver from './components/QuadraticSolver';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Giải Phương Trình Bậc 2
          </h1>
          <p className="text-gray-600 text-lg">
            Quadratic Equation Solver
          </p>
        </header>
        
        <QuadraticSolver />
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 - Phần mềm giải phương trình bậc 2 chuyên nghiệp</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
