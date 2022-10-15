import 'package:flutter/material.dart';

import 'constants.dart';

class IconContent extends StatelessWidget {
  IconContent({
    required this.iconData,
    required this.iconStr,
  });

  final IconData iconData;
  final String iconStr;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Icon(
          iconData,
          size: 80.0,
          color: const Color(0xFFFFFFFF),
        ),
        const SizedBox(
          height: 15.0,
        ),
        Text(
          iconStr,
          style: labelTextStyle,
        )
      ],
    );
  }
}
