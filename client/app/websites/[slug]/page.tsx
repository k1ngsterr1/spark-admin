import { Header } from "@features/Header"
import { Menu } from "@features/Menu"
import { WebsiteInner } from "@widgets/Screens/WebsiteInner/ui"

const WebsiteEditPage = ({params}: {params: {slug:string}})=> {
    return (
        <div className="flex">
            <Menu/>
            <main className="flex flex-col w-full">
                <Header/>
                <WebsiteInner websiteName={`${params.slug}`}/>
            </main>
        </div>
    )
}

export default WebsiteEditPage