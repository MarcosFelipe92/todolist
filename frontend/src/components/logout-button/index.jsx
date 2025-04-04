import { Door } from "phosphor-react";
import { useState } from "react";
import { authService } from "../../services/auth.service";
import { Button } from "./styles";

export function LogoutButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!authService.getToken()
  );

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    window.location.replace("/");
  };

  return (
    <>
      {isAuthenticated && (
        <Button onClick={handleLogout}>
          <Door /> Logout
        </Button>
      )}
    </>
  );
}
