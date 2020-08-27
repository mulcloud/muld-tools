import * as React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getComponent } from '../../common/locales';

export default function DemoNav(props: any) {
    let navigate = useNavigate();
    let location = useLocation();
    const getTitle = () => {
        return getComponent(location.pathname) || '';
    };
    const onBack = () => {
        navigate(-1);
    };
    const title = getTitle();
    if (title) {
        return (
            <View className="demo-nav">
                <div className="demo-nav__title">{title}</div>
                <svg className="demo-nav__back" viewBox="0 0 1000 1000" onClick={onBack}>
                    <path
                        fill="#969799"
                        fillRule="evenodd"
                        d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z"
                    />
                </svg>
            </View>
        );
    }
    return null;
}

const View = styled.div`
    &.demo-nav {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56px;
        background-color: #fff;

        .demo-nav__title {
            font-weight: 500;
            font-size: 17px;
            text-transform: capitalize;
        }

        .demo-nav__back {
            position: absolute;
            top: 16px;
            left: 16px;
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
`;
