import AddChannelButton from "@/components/add-channel";
import { ChannelTable } from "@/components/channel-table";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"

interface NichePageProps {
  params: {
    nicheId: string;
  }
}

const NichePage: React.FC<NichePageProps> = async ({ params }) => {
  const { userId } = auth();

  if(!userId)
    redirect('/sign-in');

  const niche = await prismadb.niche.findFirst({
    where: {
      id: params.nicheId,
      userId
    }
  });

  if(!niche)
    redirect('/niches');

  const channels = await prismadb.channel.findMany({
    where: {
      nicheId: params.nicheId
    },
  });

  return(
    <div>
      <h2 className="text-2xl py-4 px-2 font-extrabold">{niche.name}</h2>
      <ChannelTable items={channels} />
      <div className="py-6">
        <AddChannelButton />
      </div>
    </div>
  );
}

export default NichePage;