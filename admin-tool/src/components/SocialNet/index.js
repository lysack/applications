import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'

// Custom Components
import TabBar from 'components/TabBar'
import Navbar from 'components/Navbar'
import Main from 'components/SocialNet/main.js'

// Contract abis
import SocialNetwork from 'abis/SocialNetwork.json'
import Web3 from 'web3'
import { Tab } from '@material-ui/core'

const tabNames = ['Sell', 'Marketplace', 'Create', 'Trending', 'Following', 'My Account']


/**
 * @dev SocialNet * 
 */
class SocialNet extends React.Component {

    async componentDidMount() {
        console.group('Social Net')
        console.log('Component Did Mount =>')
        //await this.getWeb3;
        await this.loadWeb3();
        await this.loadBlockhainData();

        console.groupEnd()
    }

    async loadWeb3() {
      new Promise((resolve, reject) => {
        console.group('Load Web3')
        console.info('loading Web3, please wait . . .')

      })
        
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            console.info('Ethereum account loaded:')
        }
        else if (window.web3) {            
            window.web3 = new Web3(window.web3.currentProvider)
            console.info('web3 account loaded')
        }
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }

        console.groupEnd()
    }

    /**
     * @dev load data from the blockchain, i.e. contracts
     * 
     */
    async loadBlockhainData() {
        console.group('loading the blockchain data . . .')
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.info('loaded account: ', accounts[0])
        // Network ID
        const networkId = await web3.eth.net.getId()
        console.info('network id: ', networkId)

        /**
         * @dev Get the network data using the abi 
         */ 
        const networkData = SocialNetwork.networks[networkId]
        if (networkData) {
        const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address)
        this.setState({ socialNetwork })
        const postCount = await socialNetwork.methods.postCount().call()
        this.setState({ postCount })
        // Load Posts
        for (var i = 1; i <= postCount; i++) {
            const post = await socialNetwork.methods.posts(i).call()
            this.setState({
            posts: [...this.state.posts, post]
            })
        }

        /**
         * @dev Sort posts. Show highest tipped posts first
         * 
         */
        this.setState({
            posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount)
        })
        // remove the loader from the screen
        this.setState({ loading: false })
        } 
        else {
          console.error('SocialNetwork contract not deployed to detected network.')
          window.alert('SocialNetwork contract not deployed to detected network.')
        }

        console.groupEnd();
    }


    createPost(content) {
        this.setState({ loading: true })
        this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.setState({ loading: false })
        })
    }

    tipPost(id, tipAmount) {
        this.setState({ loading: true })
        this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
          .once('receipt', (receipt) => {
            this.setState({ loading: false })
          })
      }
    
      // Boosting can only be done by the owner of the post. 
      boostPost(id, boostAmount) {
        this.setState({ loading: true })
        this.state.socialNetwork.methods.boostPost(id).send({ from: this.state.account, value: boostAmount })
          .once('receipt', (receipt) => {
            this.setState({ loading: false })
          })
      }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            socialNetwork: null,
            postCount: 0,
            posts: [],
            loading: true,
        }
        

        this.createPost = this.createPost.bind(this)
        this.tipPost = this.tipPost.bind(this)

    }
      
    render() {
        return (
          <div className='main-container'>            
            <TabBar tabNames={tabNames}></TabBar>
            <Navbar className='navbar' account={this.state.account} />
            {this.state.loading
              ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
              : <Main
                posts={this.state.posts}
                createPost={this.createPost}
                tipPost={this.tipPost}
                account={this.state.account}
              />
            }
          </div>
        );
      }


}

export default SocialNet;

