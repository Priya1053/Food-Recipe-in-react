import {useState, useEffect  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
import { Container,Row,Col,Card } from "react-bootstrap";

 function LiveData(){
    const [mydata,setData]=useState([]);
    const api =()=>{
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=", mydata.strMeal )
        .then((response)=>response.json())
        .then((json)=>{
            setData(json.meals)
        });
    };

    useEffect(()=>{
        api();
        const interval=setInterval(() => {
            api();
        }, 20000)
        return ()=>clearInterval(interval);
    },[]);

    const extractIngredients = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient) {
            ingredients.push(`${ingredient} - ${measure}`);
          }
        }
        return ingredients;
      };

    return(
        <>
        <Container fluid>
            <Row xs={1} md={3} className="g-4">
                {
                    mydata.map(
                        (res)=>{
                            return(
                               <>
                               <Col className="container-fluid mt-4">
                                <Card className="card">
                                    <Card.Img variant="top" src={res.strMealThumb} height="300px" width="550px"/>
                                    <Card.Body>
                                        <Card.Title id='name'>{res.strMeal}</Card.Title>
                                        <Card.Text>Dish type: {res.strArea}</Card.Text>
                                        <b>Ingredients: </b>
                                        <div id='ing'>  
                                            {
                                            extractIngredients(res).map((ingredient, index) => (
                                                <Card.Text key={index}>{ingredient}</Card.Text>
                                            )
                                            )
                                            }
                                        </div>                                        
                                        <Card.Link>
                                            <a href={res.strYoutube} target="_blank" id="link">Video for {res.strMeal}</a>
                                        </Card.Link>
                                       
                                    </Card.Body>                                  
                                </Card>               
                                </Col>
                               </>
                            )
                        }
                    )
 }           
        
         </Row>
        </Container> 
   </> 
   )
                           
}
export default LiveData;