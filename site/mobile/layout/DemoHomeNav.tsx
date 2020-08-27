import * as React from 'react';
import ArrowRight from './ArrowRight';
import styled from 'styled-components';

export default function DemoHomeNav(props: any) {
    const { lang, group } = props;
    const base = lang ? `/${lang}` : '';
    const navItem = group.items.map((item) => {
        return (
            <a
                className="demo-home-nav__block"
                key={item.path}
                onClick={() => {
                    const location = window.top.location;
                    const targetPath = location.host.startsWith('mulcloud')
                        ? `/muld/#${base}/${item.path}`
                        : `/#${base}/${item.path}`;
                    window.top.location.replace(targetPath);
                }}
            >
                {item.title}
                {/* <ArrowRight className="demo-home-nav__icon" /> */}
            </a>
        );
    });

    return (
        <View className="demo-home-nav">
            <div className="demo-home-nav__title">{group.title}</div>
            <div className="demo-home-nav__group">{navItem}</div>
        </View>
    );
}

const View = styled.div`
    &.demo-home-nav {
        .demo-home-nav__title {
            margin: 24px 0 8px 16px;
            color: rgba(69, 90, 100, 0.6);
            font-size: 14px;
        }

        .demo-home-nav__block {
            position: relative;
            display: flex;
            margin: 0 0 12px;
            padding-left: 20px;
            color: #323233;
            font-weight: 500;
            font-size: 14px;
            line-height: 40px;
            background: #f7f8fa;
            border-radius: 99px;
            transition: background 0.3s;
            cursor: pointer;

            &:hover {
                background: darken(#f7f8fa, 3%);
            }

            &:active {
                background: darken(#f7f8fa, 6%);
            }
        }

        .demo-home-nav__icon {
            position: absolute;
            top: 50%;
            right: 16px;
            width: 16px;
            height: 16px;
            margin-top: -8px;
        }
    }
`;
