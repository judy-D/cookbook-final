import React, {useEffect, useState} from 'react';
import './App.css';
import firebase from './firebase';
import Panel from './components/Tabs/Panel';
import RecipeList from './components/AddRecipe/RecipeList';
import Tabs from './components/Tabs/Tabs';
import './style.scss'

const db = firebase.firestore();

function App() {
    const [recipes,
        setRecipe] = useState([])
    const [newRecipeName,
        setRecipeName] = useState()
    const [newAuthorName,
        setAuthorName] = useState()
    const [newDescription,
        setDescription] = useState()

    const [fileUrl,
        setFileUrl] = useState(null)

    useEffect(() => {
        return db
            .collection('data')
            .onSnapshot(snapshot => {
                const recipesData = [];
                snapshot.forEach(doc => recipesData.push({
                    ...doc.data(),
                    id: doc.id
                }))
                setRecipe(recipesData);
            });

    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        db
            .collection('data')
            .add({name: newRecipeName, author: newAuthorName, description: newDescription, img: fileUrl})
    }

    const onFileChange = async(e) => {
        const file = e.target.files[0]
        const storageRef = firebase
            .storage()
            .ref();
        if (file.name) {
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file)
            setFileUrl(await fileRef.getDownloadURL())
        } else {
            console.log('No Image found')
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <Tabs selected={0}>
                        {recipes.map(recipe => <Panel key={recipe.id} title={recipe.name}>
                            <RecipeList recipe={recipe}/>
                        </Panel>)}
                    </Tabs>
                </div>
            </div>
            <form
                onSubmit={onSubmit}
                style={{
                margin: 0,
                padding: '15px 0 15px 0'
            }}>
                <h3 style={{
                    color:"white"
                }}>Add New Recipe</h3>
                <label>
                    <div className="label-text">Name</div>
                    <input
                        type="text"
                        className="formStyle"
                        value={newRecipeName ? newRecipeName: '' }
                        onChange={(e) => setRecipeName(e.target.value)}
                        required/>
                </label>
                <label>
                  
                    <div className="label-text">Author</div>
                    <input
                        type="text"
                        className="formStyle"
                        value={newAuthorName ? newAuthorName: '' }
                        onChange={(e) => setAuthorName(e.target.value)}
                        required/>
                </label>
                <label>
                    <div className="label-text">Description</div>
                    <input
                        type="text"
                        className="formStyle"
                        value={newDescription ? newDescription: ''}
                        onChange={(e) => setDescription(e.target.value)}
                        required/>
                </label>
                <input type="file" onChange={onFileChange}/>
                <br/>
                <button
                    style={{
                    padding: '10px 15px',
                    margin: '5px'
                }}
                    className="btn fourth">Add</button>
            </form>
        </div>
    );
}

export default App;
