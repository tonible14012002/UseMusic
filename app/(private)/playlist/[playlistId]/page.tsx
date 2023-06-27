import { PlaylistDetailView } from "@/components/common/PlaylistDetailView";

interface PlaylistDetailPageProps {
    params: {
        playlistId: string
    }
}

export default function PlayListDetailPage ({
    params
}: PlaylistDetailPageProps) {
    const { playlistId } = params
    { /* @ts-expect-error Server Component */ }
    return <PlaylistDetailView id={playlistId}/> 
}