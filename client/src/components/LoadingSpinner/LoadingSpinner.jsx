import "./spinner.css";

export default function LoadingSpinner({width, height}) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" style={{width: width, height: height}}>
      </div>
    </div>
  );
}