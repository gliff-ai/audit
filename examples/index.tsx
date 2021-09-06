import ReactDOM from "react-dom";
import { AuditAction } from "@gliff-ai/annotate";

import UserInterface from "../src//index";

fetch("./audit.json")
  .then((response) => response.json())
  .then((audit: AuditAction[]) => {
    // render main component:
    ReactDOM.render(
      <UserInterface
        showAppBar
        sessions={[
          {
            timestamp: Date.now(),
            username: "phil",
            imagename: "Rotating_earth_(large).gif",
            audit: audit,
          },
        ]}
      />,
      document.getElementById("react-container")
    );
  });
