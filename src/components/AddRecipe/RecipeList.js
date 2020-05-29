import React from 'react'
import './RecipeList.scss';
import firebase from '../../firebase';

const RecipeList = ({recipe}) => {
    const onDelete = () => {
        const db = firebase.firestore()
        db
            .collection('data')
            .doc(recipe.id)
            .delete()
    }
    return (
        <div className="recipe-style wrapper">

            <div className="header">
                <img
                    alt="food"
                    width="450"
                    height="250"
                    src={recipe.img
                    ? recipe.img
                    : "https://media.istockphoto.com/photos/-picture-id506841767?k=6&m=506841767&s=612x" +
                        "612&w=0&h=sRC1Z7pVLYrbSQZLyrzC_UALsBcvhqXzG2Qu6AmHLms="}/>
            </div>
            <h1 className="name">{recipe.name}</h1>
            <center>
                <h3>Author: {recipe.author}</h3>
            </center>
            <div className="border"></div>
            <p className="info">{recipe.description}</p>
            <div className="grey-border"></div>
            <button className="button" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default RecipeList
