export default function updateMoveLogs(moveObject, setMoveLogs){
    setMoveLogs((prevMoveLogs)=>[...prevMoveLogs, moveObject])

}