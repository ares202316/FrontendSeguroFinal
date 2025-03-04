import Dashboard from "./dashboard";

function Layout({ children }) {
  return (
    <>
      <Dashboard /> 
      <div>{children}</div>
    </>
  );
}

export default Layout;