import './App.css';
import ChannelsMenu from './components/ChannelsMenu';
import NavMenu from './components/NavMenu';
import PostsWall from './components/PostsWall';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


function App() {

  // const { data: fetchedPosts, error: postsFetchError, isLoading: postsAreLoading } = useFetchFoundRecordsQuery(channels[0]);
  // console.log(fetchedPosts);

  // data->children->[array num]->data->score => number of votes
  // data->children->[array num]->data->author => author of the post
  // data->children->[array num]->data->subreddit_name_prefixed => subreddit topic
  // data->children->[array num]->data->thumbnail => link to preview image
  // data->children->[array num]->data->title => record title
  // data->children->[array num]->data->ups => upvotes count
  // data->children->[array num]->data->ups => upvotes count

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavMenu />
      <ChannelsMenu />
      <PostsWall />
    </Box>
  );
}

export default App;