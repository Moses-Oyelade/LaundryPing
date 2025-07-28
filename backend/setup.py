from setuptools import setup, find_packages

setup(
    name='laundryping-backend',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Django>=4.2',
        'djangorestframework>=3.14',
        'python-decouple>=3.8',
        'psycopg2-binary>=2.9',
    ],
    license='MIT',
    description='Backend for LaundryPing App using Django',
    author='Moses Oyelade',
    author_email='oyelademoses@gmail.com',
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Framework :: Django',
    ],
)
