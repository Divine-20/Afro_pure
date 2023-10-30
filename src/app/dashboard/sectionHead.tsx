// import { ArrowIcon, ExpandIcon } from "@/components/icons";
interface SeactionHeadProps {
  title: string;
  desc: string | null;
}
export default function SectionHead(props: SeactionHeadProps) {
  return (
    <div className="w-full flex  justify-between items-center ">
      <div>
        <h6 className="text-black-500 font-bold">{props.title}</h6>
        {props.desc && (
          <p className="text-black-300 font-light text-sm">{props.desc}</p>
        )}
      </div>
    </div>
  );
}
