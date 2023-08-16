import { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import NotJoinCall from "../../Components/NotJoinCall";
import OnboardingModal from "../../Components/modal/Modal";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div>
      <NavBar />
      <NotJoinCall />
      <OnboardingModal open={isOpen} toggleModal={() => setIsOpen(!isOpen)} />
    </div>
  );
}

export default Home;
