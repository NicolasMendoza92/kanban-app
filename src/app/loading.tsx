import Spinner from "@/components/Spinner"

type Props = {

}

export default function loading({}:Props) {
  return (
    <div className="flex justify-center my-20 h-screen"><Spinner/></div>
  )
}
