import * as React from 'react';
import styled from 'styled-components';
import DemoHomeNav from './DemoHomeNav';
import { config as _config } from 'site-mobile-shared';

export default function DemoHome() {
    const config = _config.site.locales['zh-CN'];
    const navs = config.nav.map((group, index) => {
        return <DemoHomeNav group={group} lang="zh-CN" key={index} />;
    });

    return (
        <View className="demo-home">
            <h1 className="demo-home__title">
                <img src={config.logo} />
            </h1>
            {navs}
        </View>
    );
}

const View = styled.div`
    &.demo-home {
        box-sizing: border-box;
        width: 100%;
        min-height: 100vh;
        padding: 46px 20px 20px;
        background: #fff;

        .demo-home__title,
        .demo-home__desc {
            padding-left: 16px;
            font-weight: normal;
            line-height: 1;
            user-select: none;
        }

        .demo-home__title {
            margin: 0 0 16px;
            font-size: 32px;
            text-align: center;

            img,
            span {
                display: inline-block;
                vertical-align: middle;
            }

            img {
                width: 32px;
            }

            span {
                margin-left: 16px;
                font-weight: 500;
            }

            &--small {
                font-size: 24px;
            }
        }

        .demo-home__desc {
            margin: 0 0 40px;
            color: rgba(69, 90, 100, 0.6);
            font-size: 14px;
        }
    }
`;
