import React from "react";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import List from "material-ui-icons/List";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import Collapse from "material-ui/transitions/Collapse";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import ChevronRight from "material-ui-icons/ChevronRight";

export default class News extends React.Component {
	constructor(props) {
		super(props);

		this.expandNews = this.expandNews.bind(this);
		this.goToPrevPage = this.goToPrevPage.bind(this);
		this.goToNextPage = this.goToNextPage.bind(this);

		this.state = {
			expand: false,
		};
	}

	expandNews() {
		this.setState({ expand: !this.state.expand });
	}

	goToPrevPage() {
		if (this.props.prevNews)
			this.props.getNews(this.props.data.symbol, this.props.prevNews);
	}

	goToNextPage() {
		if (this.props.nextNews) {
			console.log("clicked =>", this.props.data.symbol, this.props.nextNews);
			this.props.getNews(this.props.data.symbol, this.props.nextNews);
		}
	}

	render() {
		if (!this.props.news || this.props.news.length === 0) {
			<Paper elevation={3} className="position-container" square>
				<div style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography variant="headline" component="h3">News</Typography>
					</Grid>
				</div>
				<Divider />
				<div style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography component="p">No news.</Typography>
					</Grid>
				</div>
			</Paper>
		}

		return (
			<Paper elevation={3} className="position-container" square>
				<div style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography variant="headline" component="h3">News</Typography>
					</Grid>
				</div>
				<Divider />
				<Grid item xs={12}>
					{
						this.props.news.slice(0, 5).map((news) => {
							return (
								<Card key={ news.uuid }>
									<CardHeader
										avatar={ <Avatar src={ news.preview_image_url } style={{ width: 60, height: 60 }} /> }
										title={ news.title }
										subheader={ news.published_at }
									/>
									<CardMedia src={ news.preview_image_url } />
									<CardContent>
										<Typography component="p">{ news.summary }</Typography>
										<Typography component="p" align="right"><a href={ news.url } target="_blank">read more</a></Typography>
									</CardContent>
								</Card>
							);
						})
					}
					<Collapse in={ this.state.expand } timeout="auto" unmountOnExit>
						{
							this.props.news.slice(5).map((news) => {
								return (
									<Card key={ news.uuid }>
										<CardHeader
											avatar={ <Avatar src={ news.preview_image_url } style={{ width: 60, height: 60 }} /> }
											title={ news.title }
											subheader={ news.published_at }
										/>
										<CardMedia src={ news.preview_image_url } />
										<CardContent>
											<Typography component="p">{ news.summary }</Typography>
											<Typography component="p" align="right"><a href={ news.url } target="_blank">read more</a></Typography>
										</CardContent>
									</Card>
								);
							})
						}
					</Collapse>
					<Button variant="raised" color="primary" onClick={ this.expandNews } fullWidth>{ this.state.expand ? "Collapse" : "Expand" }</Button>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={ this.goToPrevPage } disabled={ this.props.prevNews ? false : true }>Prev</Button>
					<Button onClick={ this.goToNextPage } disabled={ this.props.nextNews ? false : true }>Next</Button>
				</Grid>
			</Paper>
		);
	}
}