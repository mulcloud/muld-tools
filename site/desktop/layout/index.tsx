import * as React from 'react';
import Header from './Header';
import Nav from './Nav';
import Container from './Container';
import Content from './Content';
import Simulator from './Simulator';

export function Doc(props: any) {
    const { config, lang, simulator } = props;
    return (
        <div className="mul-doc">
            <Header lang={lang} config={config} />
            <Nav lang={lang} config={config} />
            <Container hasSimulator={!!simulator}>
                <Content>{props.children}</Content>
            </Container>
            <Simulator src={simulator} />
        </div>
    );
}
