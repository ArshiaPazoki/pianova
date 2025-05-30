import Piano from "@/components/organisms/Piano";

export default function Home() {
  return (
    <div  className='w-full h-full bg-black drop-shadow-black drop-shadow-md'>
      <Piano octaves={7}/>
    </div>
    // <div className="min-h-screen bg-black text-white flex items-center justify-center">
    //   <Piano octaves={2} />
    // </div>
  );
}
