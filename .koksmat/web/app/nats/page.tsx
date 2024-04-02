import { ReactElement } from "react";
import { ShowcaseCard } from "./components/ShowCaseCard";
import NatsLog from "./components/NatsLog";
import ShowNatsLog from "../login/components/nats";
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
      component: <ShowNatsLog subject="echo" />,
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
