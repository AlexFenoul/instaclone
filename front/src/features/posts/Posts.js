import React from "react";

import fire from '../../fire';
import {Box, Button, Text, TextInput} from "grommet";
import {Like, Dislike} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import {addPost, getPosts, like} from "../../services/postsServices";


const Posts = () => {

    const [posts, setposts] = React.useState();
    const [content, setcontent] =React.useState();
    const [refresh, setrefresh] = React.useState(true);
    const user = fire.auth().currentUser;

    const publish = (e) => {
        e.preventDefault();
        
        if (content){
            addPost(content, user.email).then(setrefresh(true))
        }
    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            setposts(fetchData);
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh])


    return(
        <Box align="center">
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e)=> setcontent(e.target.value)} />
                <Button label="publier" onClick={(e)=> publish(e)}/>
            </Box>
                {posts ? 
                posts.map(post => (
                    <CardConcave align="center"
                    justify="center"
                    margin="medium"
                    width="medium">
                        <Text>{post.email}</Text>
                        <Text>{post.content}</Text>
                        <Text>Like : {post.like.length} <Button icon={<Like />} onClick={()=> like(user.email, post).then(setrefresh(true))}/></Text>
                    </CardConcave>
                ))

                 : 
                <Text>Ceci sont les posts</Text>
                }
        </Box>
    )
}

export default Posts;