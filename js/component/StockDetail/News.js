import React from "react";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import List from "material-ui-icons/List";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from "material-ui/Card";
import Avatar from "material-ui/Avatar";

export default class News extends React.Component {
	constructor(props) {
		super(props);
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
								<Card>
									<CardHeader
										avatar={ <Avatar src={ news.preview_image_url } style={{ width: 60, height: 60 }} /> }
										title={ news.title }
										subheader={ news.published_at }
									/>
									<CardMedia src={ news.preview_image_url } />
									<CardContent>
										<Typography component="p">{ news.summary }<a href={ news.url } target="_blank">read more</a></Typography>
									</CardContent>
								</Card>
							);
						})
					}
				</Grid>
			</Paper>
		);
	}
}