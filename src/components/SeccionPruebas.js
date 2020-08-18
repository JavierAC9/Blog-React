import React, {Component} from 'react';
import MiComponente from './MiComponente';



class SeccionPruebas extends Component{
	render(){
		return(
				<section id="content">

                <h2 className="subheader">Últimos artículos</h2>

                <p>
                   <code>Aprendiendo React!</code>
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>

                <section className="componentes">
                    <MiComponente />
                </section>
            </section>
			);
	}
}

export default SeccionPruebas;
