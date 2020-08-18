import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar'; 
import Moment from 'react-moment';
import 'moment/locale/es';

class Article extends Component {

	url = Global.url;

	state = {
		article:false,
		status: null
	}

	componentWillMount(){
		this.getArticle();
	}

	getArticle = () => {
		var id = this.props.match.params.id;

		axios.get(this.url + 'article/' + id)
			.then(res => {
				this.setState({
					article: res.data.article,
					status: 'success'
				});
			}).catch(err => {
				this.setState({
				articles: {},
				status: "success"
				});
			});
	}

	deleteArticle = (id) => {


		swal({
			  title: "¿Está seguro?",
			  text: "El artículo se borrará permanentemente!",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			    axios.delete(this.url + 'article/' + id)
				.then(res => {
					this.setState({
					article: res.data.article,
					status: 'deleted'
				});

			swal(
					'Artículo borrado',
					'El artículo ha sido borrado correctamente',
					'success'
				);

		});
			  } else {
			    swal(
					'Tranquilo el artículo no se ha borrado',
					'El artículo todavía existe',
					'success'
				);
			  }
		});



		
	}

	render(){

		if(this.state.status === 'deleted'){
			return <Redirect to='/blog' />
		}

		var article = this.state.article;
		return(
				<div className="center">
		            <section id="content">

		            {this.state.article && 
		            	<article className="article-item article-detail">
	                        <div className="image-wrap">
	                            {
	                        	article.image !== null ? (
	                        		<img src={this.url+'get-image/'+article.image} alt={article.title} />
	                        	) : (
	                        		<img src="https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-album-de-fotos-plano-icono-by-vexels.png" alt={article.title} />
	                        	)
	                        }
	                        </div>
	    
	                        <h1 className="subheader">{article.title}</h1>
	                        <span className="date">
	                            <Moment locale="es" fromNow>{article.date}</Moment>
	                        </span>
	                        <p>
								{article.content}
	                        </p>
	                       
	                       <div id="botonesEditarBorrar">

	                        <button onClick={
	                        	() => {
	                        		this.deleteArticle(article._id)
	                        	}
		                        } 
		                        className='btn btn-danger'>Eliminar
		                    </button>

	                        <Link to={'/blog/editar/' + article._id} className='btn btn-warning'>Editar</Link>

	                        </div>

	                        <div className="clearfix"></div>
	                    </article>
		            }

		            {!this.state.article && this.state.status === 'success' &&
		            	<div id="article">
		            		<h2 className="subheader">El artículo no existe</h2>
		            		<p>Intentelo de nuevo más tarde</p>
		            	</div>
		            }

		            {this.state.status == null &&
		            	<div id="article">
		            		<h2 className="subheader">Cargando...</h2>
		            		<p>Espere un momento</p>
		            	</div>
		            }


	                    
		            </section>
		            <Sidebar />
           		 </div>
			);
	}
}

export default Article;