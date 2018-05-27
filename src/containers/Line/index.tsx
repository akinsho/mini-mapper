import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
    GET_LINE_DETAILS,
    GetLineDetailsQuery,
} from './../../graphql/queries/tfl';

import ErrorHandler from './../../components/organisms/errorHandler';
import LineDetails from './../../components/organisms/lineDetails';
import MainTemplate from './../../components/templates/main';

type Props = RouteComponentProps<{ line: string }>;

export default class LineContainer extends React.PureComponent<Props> {
    handleClick = (stop: string) => {
        this.props.history.push(`/stops/${stop}`);
    };

    render() {
        const line = encodeURIComponent(this.props.match.params.line);
        return (
            <MainTemplate {...this.props}>
                <GetLineDetailsQuery
                    query={GET_LINE_DETAILS}
                    variables={{ line }}
                >
                    {({ data, error, loading }) => (
                        <ErrorHandler
                            data={data}
                            loading={loading}
                            error={error}
                            loaded={Boolean(data && data.line)}
                            render={({ line }) => (
                                <LineDetails
                                    stop={line}
                                    onClick={this.handleClick}
                                />
                            )}
                        />
                    )}
                </GetLineDetailsQuery>
            </MainTemplate>
        );
    }
}
