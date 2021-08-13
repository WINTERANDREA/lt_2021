import Link from "next/link";
import CustomHead from "../components/Head";

export default function Index(){
return (
  <>
  <CustomHead></CustomHead>
  <div className="wrapper">
    ELLE-ET VETERINARIA TEST
    <Link href="/login">LOGIN</Link>
  </div>
  </>
)
}