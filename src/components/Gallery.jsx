import { useEffect, useState } from "react"

export default function Gallery(){

const [images,setImages] = useState([])
const [category,setCategory] = useState("All")
const [loading,setLoading] = useState(true)

useEffect(()=>{

fetch("http://localhost:5000/images")
.then(res=>res.json())
.then(data=>{
setImages(data)
setLoading(false)
})
.catch(err=>{
console.error("Error loading images:",err)
setLoading(false)
})

},[])

const filteredImages = category === "All"
? images
: images.filter(img => img.category === category)

return(

<div style={{padding:"40px"}}>

<h2>Gallery</h2>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="All">All</option>
<option value="Wedding">Wedding</option>
<option value="Pre Wedding">Pre Wedding</option>
<option value="Mehndi">Mehndi</option>
<option value="Engagement">Engagement</option>
<option value="Drone">Drone</option>
<option value="Cinematic Film">Cinematic Film</option>

</select>

{loading && <p>Loading images...</p>}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"30px"
}}>

{filteredImages.map((img)=>(

<img
key={img._id}
src={`http://localhost:5000/uploads/${img.url}`}
alt={img.category}
style={{
width:"100%",
borderRadius:"10px",
objectFit:"cover"
}}
/>

))}

</div>

</div>

)

}