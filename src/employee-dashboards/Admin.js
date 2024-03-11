import DashCard from "../employee-components/DashCard";
function Admin() {
    return (
      <>
      <div class = "text-section-head p-8">
        Admin Dashboard
      </div>
      <div class = "m-16 flex flex-wrap">
          <DashCard/>
          <DashCard/>
          <DashCard/>
          <DashCard/>
      </div>
      </>
  
    );
  }
  
  export default Admin;