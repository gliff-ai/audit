import * as ReactDOM from "react-dom";

import UserInterface from "@/ui";

import { AuditAction } from "@gliff-ai/annotate";

fetch("audit.json")
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
