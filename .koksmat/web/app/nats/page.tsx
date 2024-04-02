import { ReactElement } from "react";
import { ShowcaseCard } from "./components/ShowCaseCard";
import NatsLog from "./components/Nats-Server";
import ShowNatsLogUsingSocketConnection from "./components/Nats-Socket";
interface ShowCaseProps {
  component: ReactElement;
  name: string;
}
export default function Home() {
  const components: ShowCaseProps[] = [
    {
      name: "NatsLog 2",
      component: <NatsLog />,
    },
    {
      name: "NatsLog 1",
      component: (
        <ShowNatsLogUsingSocketConnection
          subject="echo"
          servers={process.env.NATSSOCKET ?? "wss://0.0.0.0:433"}
        />
      ),
    },
  ];
  return (
    <div>
      Home
      <div>
        {components.map((showCase, index) => (
          <div key={index}>
            <ShowcaseCard title={showCase.name}>
              {showCase.component}
            </ShowcaseCard>
          </div>
        ))}
      </div>
    </div>
  );
}
