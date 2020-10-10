import React, { useState, useCallback } from 'react';
import {
    BackTop,
    PageHeader,
    Form,
    Input,
    Layout,
    Typography,
    Button,
    Divider,
    Card,
    Affix,
    Empty,
} from 'antd';

import 'antd/dist/antd.css';
import 'github-fork-ribbon-css/gh-fork-ribbon.css';

const { Header, Content, Footer } = Layout;

const Validator = {
    checkSource(formData: any) {
        const { source } = formData;
        if (!source || source.trim().length === 0) {
            return {
                valid: false,
                message: 'Please input a source.',
            };
        }

        return {
            valid: true,
            message: '',
        };
    },
};

const JsonFomatter = () => {
    const [source, setSource] = useState('');
    const [json, setJson] = useState('');
    const [jsonError, setJsonError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sourceErrorMessage, setSourceErrorMessage] = useState('');

    const onChangeSource = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setSource(newValue);
        const { message } = Validator.checkSource({ source: newValue });
        setSourceErrorMessage(message);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { message, valid } = Validator.checkSource({
            source,
        });
        setSourceErrorMessage(message);

        if (valid) {
            setLoading(true);
            setJson('');
            setJsonError('');
            try {
                const dist = JSON.parse(source);
                setJson(JSON.stringify(dist, null, 4));
            } catch (e) {
                // console.log('error', e);
                setJsonError(e.toString());
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Layout>
            <BackTop />
            <Header style={{position:'fixed', zIndex: 100, width: '100%'}}>
                <h1 style={{ color: 'white' }}>Json Formatter</h1>
            </Header>
            <Content style={{
                minHeight: 'calc(100vh - 113px)',
                padding: '1.3rem', marginTop: '64px'
            }}>
               
                <Form onSubmitCapture={onSubmit} layout="vertical"> 
                    <Form.Item
                        label="Source"
                        hasFeedback={true}
                        help={sourceErrorMessage}
                        validateStatus={Boolean(sourceErrorMessage) ? 'error' : ''}
                        extra={(
                            <ol>
                                <li>Pastes your source text on source textarea.</li>
                                <li>Click a Format button.</li>
                            </ol>
                        )}
                    >
                        <Input.TextArea value={source} onChange={onChangeSource} rows={8} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            disabled={loading || !source}
                            shape="round"
                            block={true}
                        >
                            Format
                        </Button>
                    </Form.Item>
                </Form>

                {Boolean(json) ? (
                    <>
                        <Divider orientation="left">Formatted</Divider>
                        <Card>
                            <pre>
                                <code>{json}</code>
                            </pre>
                        </Card>
                    </>
                ):<Empty description="" />}

                {Boolean(jsonError) && (
                    <>
                        <Divider orientation="left">Error</Divider>
                        <Card>
                            <Typography.Paragraph type="danger">{jsonError}</Typography.Paragraph>
                        </Card>
                    </>
                )}
            </Content>
            <Footer />
            <a
                className="github-fork-ribbon"
                style={{
                    position: 'fixed',
                }}
                href="https://github.com/bbonkr/json-formatter"
                data-ribbon="Fork me on GitHub"
                title="Fork me on GitHub"
            >
                Fork me on GitHub
            </a>
        </Layout>
    );
};

export default JsonFomatter;
