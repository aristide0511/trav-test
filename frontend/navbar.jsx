import { h, render, Component } from 'preact';
import classNames from 'classnames';
import axios from 'axios';
import { route } from 'preact-router';
import uniqid from 'uniqid';

import { connect } from 'unistore/preact';

const actions = store => ({
	add_notification(state, message, level) {
		const noti = {
			id: uniqid.time(),
			message,
			level
		};

		return { notifications: [ ...state.notifications, noti ] };
	}
});

@connect('notifications', actions)
export default class NavBar extends Component {
	state = {
		burger: false
	}

	show_burger = e => {
		this.setState({
			burger: !this.state.burger
		});
	}

	get_new = async ident => {
		const payload = {
			action: 'new',
			feature: {
				ident
			}
		};

		const res = await axios.post('/api/feature', payload);

		const { error, message, data } = res.data;

		if(error) {
			this.props.add_notification(message, 'error');
			return;
		}

		const { uuid } = data;

		route(`/edit_feature/${ ident }/${ uuid }`);
	}

	render() {
		const burger_class = classNames({
			'navbar-burger': true,
			'burger': true,
			'is-active': this.state.burger
		});

		const menue_class = classNames({
			'navbar-menu': true,
			'is-active': this.state.burger
		});

		return (
			<nav class="navbar is-light is-fixed-top">
				<div class="container">
					<div class="navbar-brand">
						<a class="navbar-item" href="https://github.com/scriptworld-git/king-bot-api">
							king-bot-api
						</a>
						<a role="button" onClick={ this.show_burger } class={ burger_class } aria-label="menu" aria-expanded="false">
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
					<div class={ menue_class }>
						<div class="navbar-start">
							<a class="navbar-item" href="/">
								home
							</a>

							<div class="navbar-item has-dropdown is-hoverable">
								<a class="navbar-link is-arrowless">
									add feature
								</a>

								<div class="navbar-dropdown is-radiusless">
									<a className="navbar-item" onClick={ e => this.get_new('farming') }>
										send farmlist
									</a>
									<a className="navbar-item" onClick={ e => this.get_new('queue') }>
										building queue
									</a>
								</div>
							</div>

							<div class="navbar-item has-dropdown is-hoverable">
								<a class="navbar-link is-arrowless">
									extras
								</a>

								<div class="navbar-dropdown is-radiusless">
									<a className="navbar-item" href="/easy_scout">
										easy scout
									</a>
								</div>
							</div>

						</div>
						<div class="navbar-end">
							<a class="navbar-item" href="https://github.com/scriptworld-git/king-bot-api/blob/master/README.md">
								documentation
							</a>

							<a class="navbar-item" href="https://ko-fi.com/Y8Y6KZHJ">
								donate
							</a>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}
